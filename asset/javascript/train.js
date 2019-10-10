        var name="";
        var destination="";
        var beginTime="";
        var frequency="";

        // firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBeVjyU1FmUt7jxoD08au2OqRJC1IWMwEE",
            authDomain: "longwinteriscoming.firebaseapp.com",
            databaseURL: "https://longwinteriscoming.firebaseio.com",
            projectId: "longwinteriscoming",
            storageBucket: "longwinteriscoming.appspot.com",
            messagingSenderId: "763472286323",
            appId: "1:763472286323:web:c90401fbb67a2474d9d006"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Create a variable to reference the database.
        var database = firebase.database();

        //summit button function
        $("#add-Train-btn").on("click",function(event){
            name=$("#train-name-input").val().trim();
            destination=$("#destination-input").val().trim();
            beginTime=$("#beginTime-input").val().trim();
            frequency=$("#frequency-input").val().trim();

            database.ref().push({
            name: name,
            destination: destination,
            beginTime: beginTime,
            frequency:frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        });

        database.ref().on("child_added", function(snapshot) {
            var sv = snapshot.val();
            console.log(sv.name);
            console.log(sv.destination);
            console.log(sv.beginTime);
            console.log(sv.frequency);

            // append the table to reflect
            var tr=$("<tr>");
            tr.append("<td>"+sv.name+"</td>");
            tr.append("<td>"+sv.destination+"</td>");
            tr.append("<td>"+sv.frequency+"</td>");
            
            //run timeCal function
            var remainTime=timeCal(sv.beginTime, sv.frequency);
            
            //run ArivalTime function
            var ArivalTime=ArivalTimeCal(remainTime);

            //append the Arrival time and remain time to <tr>
              tr.append("<td>"+ArivalTime+"</td>");
              tr.append("<td>"+remainTime+"</td>");
            console.log(ArivalTime);
            $("#displaySchedule").append(tr);
            // Handle the errors
            }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

        //function for calculating the Arrival time and Minutes aways

        function timeCal(beginTime, frequency){

          var timeRemain;
          
          var convertedDate=moment(beginTime,"HH:mm");
          console.log(beginTime);
          console.log(moment());
          var timeDiff=convertedDate.diff(moment(),"minutes");
          console.log(timeDiff);
          
          
          //calculate how many times the train has traveled
          var Abs=Math.abs(timeDiff);
          console.log(Abs);
          console.log(frequency);
          var traveled=Abs%frequency;
          console.log(traveled);//traveled is the time that the current processting train has been traveled
          //if travel is no equal to 0, then it will always smaller than frequency

            timeRemain=frequency-traveled;
            console.log(timeRemain);
            return timeRemain;
        }

        //function to add time to the current time, return the Arrival time
        function ArivalTimeCal(remainTime){
          var Time=moment().add(remainTime, 'minutes').format('hh:mm A');
          return Time;
        }