const Ticket = require('../Models/bookTickets');
const User = require('../Models/users');


const bookTicketController = async (req,res) =>{
    try{
        if(req.body.seats.length == 0){
            return res.status(400).json({message:'Please select seat(s)'})
        }
        const bookTicket = {
            movieID: req.body.movie,
            cinemaID: parseInt(req.body.cinema),
            showDate: req.body.date,
            showTime: req.body.showTime,
            bookedSeats: req.body.seats
        }
        const ExistingShow = await Ticket.findOne({
            movieID: req.body.movie,
            cinemaID: parseInt(req.body.cinema),
            showDate: req.body.date,
            showTime: req.body.showTime
        })
        if(ExistingShow){
            ExistingShow.bookedSeats.map((bookedSeat)=>{
                req.body.seats.map((selectedSeat)=>{
                    if(bookedSeat == selectedSeat){
                        return res.status(400).json({message:'One or more selected seats are not available'})
                    }
                })
            })
            ExistingShow.bookedSeats = [...ExistingShow.bookedSeats,...req.body.seats];
            await ExistingShow.save();
            
        }else{
            await Ticket.create(bookTicket);
        }
        const user = await User.findOne({username:req.user});
        user.bookedShows = [...user.bookedShows,bookTicket];
        user.save()
        res.status(200).json({message:'Your ticket has been booked'});
    }catch(err){
        console.log('Error :',err);
        res.status(500).json({message:'Failed to book ticket'});
    }
}

const bookedTicketsController = async (req,res) =>{
    try{
        const movieID = parseInt(req.query.movieID);
        const cinemaID = parseInt(req.query.cinemaID);
        const showDate = req.query.showDate;
        const showTime = req.query.showTime;
        const bookedTicket = await Ticket.findOne({movieID:movieID,cinemaID:cinemaID,showDate:showDate,showTime:showTime});
        if(bookedTicket){
            res.status(200).json({'seats': bookedTicket.bookedSeats});
        }else{
            res.status(200).json({'seats':[]})
        }
        
    }catch(err){
        console.log('Error :',err);
    }
}

module.exports = {bookedTicketsController,bookTicketController};