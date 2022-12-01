export const validationForm = (input:string)=>{
    if(input){
        console.log('input',input)
        //phát hiện kí tự ' và các dạng tương đương
       const testCase1 = /(\%27)|(\')|(\-\-)|(%23)|(#)/i
       //phát hiện kí tự = 
       const testCase2 = /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i
       //
       const testCase3 =/\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i
       //
       const testCase4 =/exec(\s|\+)+(s|x)p\w+/i
       return testCase4.test(input)
    }
    return false;
}