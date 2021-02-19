/* istanbul ignore next */
export async function handleErrors(res:Response) {
    var errorRes:any = {};
    if (!res.ok) {
        if(res.status == 400){
            errorRes.content = await res.json();
        }
        else{
            errorRes.content =  await res.text();
        }
        errorRes.code = res.status;
        throw errorRes;
    }
    return res;
}

export function mapErrorToErrorList(err: any) {
    let errorList = err.content.errorList.map((error: any) => '- ' + error.errorMessage + '\n');
    return errorList
}