const {Message} = require('../models/chatModel')


const getAllMessages = async  (req,res)=> {
    try{ 
        const messages= await Message.find();
        if(!messages){
         res.status(200).send('No Messages Found');
        }
        else{
         res.status(200).json(messages)
        } 
    }
    catch(err){
      return res.status(400).send({message:err.message})
    }
 }
 const createMessage =  async (req,res)=>{
    try { 
        console.log('Request Body:', req.body);
        if(!req.body.message){
            return res.status(400).json({message:'Missing message'});
        }
        const newMessage = {
            message: req.body.message,
            username: req.body.username
        }
        const createdMessage = await Message.create(newMessage)
        return res.status(200).send(createdMessage)      
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message})
    }
}

module.exports = {getAllMessages,createMessage}