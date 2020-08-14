import * as firebase from 'firebase';
import firebaseConfig from './utils/config';
import { validateLoginData} from './utils/validator';
firebase.initializeApp(firebaseConfig)

export const Login = (req :any,res:any)=>{
    const {email='',password=''} = req.body
    const user ={email,password}
    const { valid, errors } = validateLoginData(user);
    if (!valid) return res.status(400).json(errors)
    firebase.auth().signInWithEmailAndPassword(user.email,user.password).then((data)=>{
        return data.user?.getIdToken()
    }).then((token)=>{
        res.json({token})
    }).catch((error)=>{
        console.error(error);
        return res.status(403).json({ general: 'wrong credentials, please try again'});
    })

}