var React = require ('react');
var firebase = require('firebase');
var ContentHeader = require('ContentHeader');
var Halogen = require('halogen/ClipLoader');


var Card = React.createClass({
    getInitialState: function () {
        return {
           hot: [],
           cold: [],
           score: 0,
           strScore: "",
           title: "",
           date: "",
           location: "",
           fightersCount: "",
           fights: "fights"
        }
    },
    componentWillMount: function () {
        //console.log('Hello');
    },
    componentDidMount: function () {
        function computeScore (recordSplit) {
            var RecordScore = 0;
            for (var i = 0; i < recordSplit.length; i++) {
                if (recordSplit[i] === "o") {
                    return RecordScore;
                }
                if (i > 0 && recordSplit[i] !== recordSplit[i-1] && recordSplit[i] !== "d") {
                    return RecordScore;
                }
                if (recordSplit[i] === "w") {
                    RecordScore = RecordScore + 1;
                }
                if (recordSplit[i] === "l") {
                    RecordScore = RecordScore -1;
                }
            }
            return RecordScore;
        }
            var event_url = this.props.params.splat;
            var ref = firebase.database().ref('events');
            var refFighters = firebase.database().ref('fighters');
            var hotvents = [];
            var that = this;
            ref.once('value').then((snapshot) => {
                var fightevents = snapshot.val();
                for (var i = 0; i < fightevents.length; i++) {
                    if (fightevents[i].url === event_url) {
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
                                for (var n = 0; n < allFighters.length; n++) {
                                    //console.log(allFighters[n].name);
                                }
                                //console.log(allFighters);
                                for (var k = 0; k < allFighters.length; k++) {
                                    if (allFighters[k].name === fighterList[key].red) {
                                        var strRecord = allFighters[k].record;
                                        var redRecordSplit = strRecord.split(",");
                                        var redRecord = computeScore(redRecordSplit);
                                        
                                        if (redRecord > 0) {
                                            var redRecordStr = "+"+redRecord;
                                        }
                                        else {
                                            var redRecordStr = redRecord;
                                        }
                                        //console.log(redRecord);
                                        that.setState({score: that.state.score + redRecord});
                                    }
                                    if (allFighters[k].name === fighterList[key].blue) {
                                        var blueRecordSplit = allFighters[k].record.split(",");
                                        var blueRecord = computeScore(blueRecordSplit);
                                        if (blueRecord > 0) {
                                            var blueRecordStr = "+"+blueRecord;
                                        }
                                        else {
                                            var blueRecordStr = blueRecord;
                                        }
                                        //console.log(blueRecord);
                                        that.setState({score: that.state.score + blueRecord});
                                    }
                                }
                                var zip =
                                    {
                                        fighterRed: red,
                                        fighterBlue: blue,
                                        redScore: redRecordStr,
                                        blueScore: blueRecordStr,
                                        divShort: divShort,
                                        division: division
                                    };
                                zipper.push(zip);
                                that.setState({cold: zipper});
                                if (that.state.score > 0) {
                                    var strScore = "+"+that.state.score;
                                    that.setState({strScore: strScore});
                                }
                                else {
                                    that.setState({strScore: that.state.score});
                                }
                            });    
                        }));
                        
                    }
                }
            }, (e) => {
                console.log('unable to fetch', e)
            });
    },
    render: function () {
        
        if (!this.state.score) {
                return <div><Halogen className = "halogen" color="#5F7187" size="72px" margin="48px"/></div>
            }
        
        var fightCardList = this.state.cold.map((op,index) => {
            return  <div className="row tab-row-parent" key={index}>
                        <table>
                            <tbody>
                              <tr>
                                <td rowSpan="2" width="25%" className="first-td"><span data-tooltip aria-haspopup="true" class="has-tip" data-disable-hover="false" tabindex="1" title="{op.divison}">{op.divShort}</span></td>
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

/*
<ContentHeader title={this.state.title} date={this.state.date} location={this.state.location}/>




{this.state.hot.map(card=>{
                                return <div className="profile-card">{card.red}{card.blue}</div>
                            })}
<div className="small-5 columns tab-row-big">
                        <div className="row tab-row">
                          <div className="small-12 columns">
                            {op.fighterRed}
                          </div>
                        </div>
                        <div className="row tab-row">
                          <div className="small-12 columns">
                            {op.fighterBlue}
                          </div>
                        </div>
                      </div>
                      
                      <div className="small-3 columns tab-row-big">
                        <div className="row tab-row">
                          <div className="small-12 columns">
                            {op.redScore}
                          </div>
                        </div>
                        <div className="row tab-row">
                          <div className="small-12 columns">
                            {op.blueScore}
                          </div>
                        </div>
                      </div>
                      <div className="small-4 columns tab-row-big-division">
                        <div className="row tab-row-tall">
                          
                            <h1>{op.division}</h1>
                         
                        </div>
                      </div>




*/