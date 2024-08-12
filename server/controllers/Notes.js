const userschema=require('../models/user');

exports.getAllNotes=async(req,res)=>{
    try{
        const {payload}=req;

        const id=payload.id;

        const user=await userschema.findById(id);
        const Allnotes=user.notes
        const name=user.name
        // console.log("ALL NOTES : ",Allnotes)
        return res.status(200).json({
            success:true,
            message:"All Notes fetched",
            Allnotes,
            name
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error in getallnotes",
            error:e.message
        })
    }
}

exports.addNote=async(req,res)=>{
    try{
        const {title,content}=req.body;
        const {payload}=req;

        if(!title || !content){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }

        // console.log("JEE HA")

        const user=await userschema.findById(payload.id);

        const alreadyExist=user.notes.find(note=> note.title===title);



        if (alreadyExist) {
            return res.json({
                success:false,
                message:"You Already have note with the same Title"
            })
        }

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
        const now = new Date(Date.now());

        // Extract components
        const year = now.getFullYear();
        const month =monthNames[now.getMonth() + 1]; // getMonth() is zero-based
        const date = now.getDate();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format

        if(minutes<10){
            minutes='0'+minutes;
        }
        const time=hours+":"+minutes+" "+ampm;
        const day=date+" "+month+" , "+year;


        const note={
            title:title,
            body:content,
            time:time,
            day:day
        }

        const updateUser=await userschema.findByIdAndUpdate(payload.id,{$push:{notes:note}},{new:true})
        
        return res.status(200).json({
            success:true,
            message:"Note added successfully"
        })

    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error during addnote",
            error:e.message
        })
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const { title } = req.body; // Only the title is needed for deletion
        const { payload } = req;

        const updateUser = await userschema.findByIdAndUpdate(
            payload.id,
            { $pull: { notes: { title: title } } }, 
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            notes: updateUser.notes 
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error during deleteNote",
            error: e.message
        });
    }
};

exports.updateNote=async(req,res)=>{
    try{
        const {title,content}=req.body;

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
        const now = new Date(Date.now());

        // Extract components
        const year = now.getFullYear();
        const month =monthNames[now.getMonth() + 1]; // getMonth() is zero-based
        const date = now.getDate();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format

        if(minutes<10){
            minutes='0'+minutes;
        }
        const time=hours+":"+minutes+" "+ampm;
        const day=date+" "+month+" , "+year;

        const updatedOne={
            title:title,
            body:content,
            time:time,
            day:day
        }

        await userschema.findOneAndUpdate({'notes.title':title},{$set:{'notes.$':updatedOne}},{new:true});

        return res.json({
            success:true,
            message:"Note updated successfully"
        })

    }
    catch(e){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error during updatingNote",
            error: e.message
        });
    }
}