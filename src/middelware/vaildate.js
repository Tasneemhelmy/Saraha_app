const vaildateSchema=(Schema,url)=>{
    return (req,res,next)=>{
        const objects={
            ...req.body,
            ...req.params,
            ...req.query
        }
        if(req.file){
            objects.file={...req.file}
        }
        if(req.files){
            objects.files={...req.files}
        }
        const {error}=Schema.validate(objects,{abortEarly:false})
        if(error){
            const vaildationErorr=[]
            for (const element of error.details) {
                vaildationErorr.push(element.path[0])
            }
            console.log(vaildationErorr)
            return res.render(url,{
                css:'../shared/Css/signUp.css',
                js:'../shared/Js/signUp.js',
                title:url,
                error:"",
                vaildationErorr:vaildationErorr,
                data:{}    
            })  
            
        
        }
        return next()
    }
}
export default vaildateSchema