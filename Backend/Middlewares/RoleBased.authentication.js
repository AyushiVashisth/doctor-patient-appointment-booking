//role based authorization

const DoctorAuth=(req,res,next)=>{
    let {role}=req.body
    if(role=="doctor" || role=="admin"){
        next()
    }else{
        res.status(403).json({ message: 'Admin or Doctor can acsess',status:true });
    }
}

const PatientAuth=(req,res,next)=>{
    console.log(req.body)
    const {role}=req.body
    console.log("Role:",role)
    if(role=="patient" || role=="admin" ||role=="doctor"){
        console.log(role)
        next()
    }else{
        res.status(403).json({ message: 'Admin or Doctor can acsess',status:true });
    }
}
module.exports={DoctorAuth,PatientAuth}