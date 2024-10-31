const bookTicketController = (req,res) =>{
    try{
        console.log(req.body);
    }catch(err){
        console.log('Error :',err)
    }
}

const bookedTicketsController = (req,res) =>{
    try{
        console.log(req.body);
        res.status(200).json({'message':['A1','A2']})
    }catch(err){
        console.log('Error :',err);
    }
}

module.exports = {bookedTicketsController,bookTicketController};