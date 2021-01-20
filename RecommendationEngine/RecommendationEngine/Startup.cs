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

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "frontend/build";
            //});

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1",
                    new Microsoft.OpenApi.Models.OpenApiInfo
                    {
                        Title = "Recommendation Engine API",
                        Description = "Exposing the controllers of the API to the client (front-end) for development and documentation purposes.",
                        Version = "v1"
                    });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = System.IO.Path.Combine(System.AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);
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
            //app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "FrontEnd";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseReactDevelopmentServer(npmScript: "start");
            //    }
            //});

            app.UseSwagger();

            app.UseSwaggerUI(options => 
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Recommendation Engine API");
                options.RoutePrefix = string.Empty;
            });
        }
    }
}
