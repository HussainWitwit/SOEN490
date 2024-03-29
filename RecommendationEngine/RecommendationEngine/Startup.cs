using System;
using Autofac;
using Autofac.Extras.Quartz;
using Interfaces.RecommendationScheduler;
using Interfaces.Utilities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Models.DB;
using RecommendationEngine.Utilities;
using RecommendationScheduler.RecommendationJob;
using System.Collections.Specialized;
using System.Reflection;
using System.Security.Claims;
using Interfaces.Hub;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using RecommendationEngine.Authentication;
using RecommendationEngine.Hub;

namespace RecommendationEngine
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // This is a simple JWT Token authentication. This setup by itself is bad, and eventually should be replaced
            // by a real authentication process. However, this has not been made available yet.
            services.AddAuthentication(o =>
                {
                    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(o =>
                {
                    o.SecurityTokenValidators.Clear();
                    o.SecurityTokenValidators.Add(new SimpleTokenValidator());
                });

            // Maps name claim to userIds for SignalR
            services.AddSingleton<IUserIdProvider, CustomNameProvider>();


            services.AddAuthorization(o =>
            {
                o.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                    .RequireClaim(ClaimTypes.Name)
                    .Build();
            });
            services.AddControllersWithViews();
            services.AddSignalR();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "FrontEnd/build";
            });
        }

        // ConfigureContainer is where you can register things directly
        // with Autofac. This runs after ConfigureServices so the things
        // here will override registrations made in ConfigureServices.
        // Don't build the container; that gets done for you by the factory.
        public void ConfigureContainer(ContainerBuilder builder)
        {
            // Register your own things directly with Autofac here. Don't
            // call builder.Populate(), that happens in AutofacServiceProviderFactory
            // for you.

            var dataAccess = Assembly.GetExecutingAssembly();

            builder.RegisterAssemblyTypes(dataAccess)
                .Where(t => t.Name.EndsWith("Service"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(dataAccess)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
            builder.RegisterType<RecommendationEngineDBContext>()
                .InstancePerLifetimeScope();
            builder.RegisterType<RecommendationJobLogger>()
                .As<IRecommendationJobLogger>()
                .InstancePerLifetimeScope();
            builder.RegisterType<NotificationHub>()
                .As<INotificationHub>()
                .SingleInstance();

            // Recommendation Scheduler
            RegisterScheduler(builder);
            builder.RegisterType<RecommendationScheduler.RecommendationScheduler>()
                .As<IRecommendationScheduler>()
                .SingleInstance();
        }

        private static void RegisterScheduler(ContainerBuilder builder)
        {
            // configure and register Quartz
            NameValueCollection config = new NameValueCollection();
            config["quartz.scheduler.instanceName"] = "RecommendationJobScheduler";
            config["quartz.threadPool.threadCount"] = "2";
            config["quartz.jobStore.type"] = "Quartz.Simpl.RAMJobStore, Quartz";
            config["quartz.threadPool.type"] = "Quartz.Simpl.SimpleThreadPool";

            builder.RegisterModule(new QuartzAutofacFactoryModule
            {
                ConfigurationProvider = c => config
            });

            // Add new incoming recommendation jobs
            builder.RegisterModule(new QuartzAutofacJobsModule(typeof(YearlyWashOptimizationRecommendationJob).Assembly));
            //builder.RegisterModule(new QuartzAutofacJobsModule(typeof(FuseReplacementRecommendationJob).Assembly));
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IRecommendationScheduler scheduler)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapHub<NotificationHub>("/notificationhub");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "FrontEnd";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            }
    }
}
