function main() {
    new Complaint("nono", "robot")
    new Complaint("Telemaco", "img_telemaco")
    new Gate("gate_telemaco", null, { 
        do_onmouseover: function(event, element){
            alert("Ouch!!")
        }})
}
