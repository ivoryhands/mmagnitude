var React = require ('react');
var firebase = require('firebase');
var ContentHeader = require('ContentHeader');
var Halogen = require('halogen/ClipLoader');


var Card = React.createClass({
    getInitialState: function () {
        return {
           hot: [],
           cold: [],
           score: false,
           strScore: "",
           title: "",
           date: "",
           location: "",
           fightersCount: "",
           fights: "fights",
           finished: false
        }
    },
    componentWillMount: function () {
        
    },
    componentDidMount: function () {
        function datePos (dateSplit, cardDate) {
            var pos = 0;
            
            for (let x of dateSplit) {
                var fightDate = new Date(x.replace(/-/g, "/"));
                if (fightDate.getTime() < cardDate.getTime()) {
                    return pos;
                }
                pos++;
            }
        }
        function computeScore (recordSplit, dateSplit, cardDate) {
            console.log(recordSplit);
            console.log(dateSplit);
            var RecordScore = 0;
            var cardDate = new Date(cardDate.replace(/-/g, "/"));
            
            var pos = datePos(dateSplit, cardDate);
            console.log(pos);
            
            for (var i = pos; i < recordSplit.length; i++) {
                if (recordSplit[i] === "o") {
                    //return RecordScore;
                    //RecordScore = RecordScore + 0;
                }
                if (i > pos && recordSplit[i] !== recordSplit[i-1] && recordSplit[i] !== "d" && recordSplit[i-1] !== "o" && recordSplit[i-1] !== "d") {
                    return RecordScore;
                }
                if (recordSplit[i] === "w") {
                    RecordScore = RecordScore + 1;
                }
                if (recordSplit[i] === "l") {
                    RecordScore = RecordScore -1;
                }
            }
            console.log(RecordScore);
            return RecordScore;
        }
            var event_url = this.props.params.splat;
            var ref = firebase.database().ref('events');
            var refFighters = firebase.database().ref('fighters');
            var hotvents = [];
            var that = this;
            
            ref.once('value').then((snapshot) => {
                var fightevents = snapshot.val();
                console.log("refonce");
                for (var i = 0; i < fightevents.length; i++) {
                    if (fightevents[i].url === event_url) {
                        var totalScore = 0;
                        var firebasePOS = i;
                        hotvents.push(fightevents[i]);
                        var fighter_list = [];
                        var fighterList = fightevents[i].fights;
                        that.setState({hot: fightevents[i].fights});
                        that.setState({title: fightevents[i].title, date: fightevents[i].date, location: fightevents[i].location});
                        that.setState({fightersCount: fighterList.length});
                        
                        refFighters.once('value').then((snapshotFighters=> {
                            var allFighters = snapshotFighters.val();
                            var redRecordArr = [];
                            var blueRecordArr = [];
                            var zipper = [];
                            var score = 0;
                            
                            Object.keys(fighterList).map(function(key, index) {
                                var redRecord = 0;
                                var blueRecord = 0;
                                var red = fighterList[key].red;
                                var blue = fighterList[key].blue;
                                var division = fighterList[key].division;
                                var divShort = fighterList[key].divshort;
                                var blueRecord;
                                var redRecord;
                                var counter = 0;
                                for (var k = 0; k < allFighters.length; k++) {
                                    if (allFighters[k].name === fighterList[key].red) {
                                        console.log(allFighters[k].name);
                                        var redRecordSplit = allFighters[k].record.split(",");
                                        var redDateSplit = allFighters[k].date.split(",");
                                        var redRecord = computeScore(redRecordSplit, redDateSplit, that.state.date);
                                        console.log(redRecord);
                                        that.setState({score: that.state.score + redRecord});
                                        totalScore = totalScore + redRecord;
                                    }
                                    if (allFighters[k].name === fighterList[key].blue) {
                                        console.log(allFighters[k].name);
                                        var blueRecordSplit = allFighters[k].record.split(",");
                                        var blueDateSplit = allFighters[k].date.split(",");
                                        var blueRecord = computeScore(blueRecordSplit, blueDateSplit, that.state.date);
                                        that.setState({score: that.state.score + blueRecord});
                                        totalScore = totalScore + blueRecord;
                                    }
                                }
                                    that.setState({finished: true});
                                var zip =
                                    {
                                        fighterRed: red,
                                        fighterBlue: blue,
                                        redScore: redRecord,
                                        blueScore: blueRecord,
                                        divShort: divShort,
                                        division: division
                                    };
                                zipper.push(zip);
                                that.setState({cold: zipper});
                                
                            });
                            /*  Push Dwyer Score to Firebase
                            *   @params firebasePath = current events node
                            *   @params addScoreRef = firebase path
                            */ 
                            //var firebasePath = "events/"+firebasePOS;
                            //var addScoreRef = firebase.database().ref(firebasePath);
                            
                            //addScoreRef.update({ event_score: totalScore })
                            //  .then(function() {
                                
                            //  })
                            //  .catch(function(error) {
                            //    console.log('Synchronization failed');
                            //});
                        }));
                    }
                }
            }, (e) => {
                console.log('unable to fetch', e)
            });
    },
    render: function () {
        console.log(this.state.finished, "finished");
        if (!this.state.finished) {
                return <div><Halogen className = "halogen" color="#5F7187" size="72px" margin="48px"/></div>
            }
        
        var fightCardList = this.state.cold.map((op,index) => {
            return  <div className="row tab-row-parent" key={index}>
                        <table>
                            <tbody>
                              <tr>
                                <td rowSpan="2" width="25%" className="first-td"><span data-tooltip aria-haspopup="true" className="has-tip" data-disable-hover="false" tabIndex="1" title={op.divison}>{op.divShort}</span></td>
                                <td width="50%">{op.fighterRed}</td>
                                <td width="25%">{op.redScore}</td>
                              </tr>
                              <tr>
                                <td>{op.fighterBlue}</td>
                                <td>{op.blueScore}</td>
                              </tr>
                            </tbody>
                        </table>
                        
                    </div>
        })

        return (
            <div className="fadeIn slideUp">
                
               <ContentHeader title={this.state.title} date={this.state.date} location={this.state.location} score={this.state.score} fightersCount={this.state.fightersCount}/>
            
                
                    <div className="row fadeIn slideUp">
                        <div className="small-1 large-2 columns">
                            <p></p>
                        </div>
                        <div className="small-10 large-8 columns mid-card">
                            
                            <div className="fight-card-title"><h2>FIGHT CARD</h2></div>
                            <div className="column fight-col">
                                            <table>
                                                <thead>
                                                    <tr>
                                                      <th width="25%">Division</th>
                                                      <th width="50%">Fighter</th>
                                                      <th width="25%">Score</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                {fightCardList}
                            
                            </div>
                        </div>
                        <div className="small-1 large-2 columns">
                            <p></p>  
                        </div>
                    </div>
            </div>      
            
        )
    } 
});

module.exports = Card;