export default function handler(req,res){
    console.log(res)
    res.status(200).json({text:'Hello',test:'aaiaiai'})
}