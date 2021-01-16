import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Number from '../../components/Number/Number';
import Graph from '../../components/Graph/Graph';
import WordTable from '../../components/WordTable/WordTable';
import AmenitiesTable from '../../components/AmenitiesTable/AmenitiesTable';
import './Lookup.css';

function Lookup() {
  const [suburbs, setSuburbs] = React.useState([]);
  const [state, setState] = React.useState('');
  const [suburb, setSuburb] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [disaster, setDisaster] = React.useState('');
  const [socioeconomic, setSocioeconomic] = React.useState([]);
  const [totalChildren, setTotalChildren] = React.useState(0);
  const [singleChildren, setSingleChildren] = React.useState(0);
  const [coupleChildren, setCoupleChildren] = React.useState(0);
  const [ssc, setSsc] = React.useState(0);

  React.useEffect(() => {
    function getData() {
      var suburbsJson = require('../../data/suburbs.json');
      var x = suburbsJson.data.filter(function(item){
        return item.state == state;
      });
      setSuburbs(x);
      if(suburb != ""){
        setSsc(x.filter(function(item){
          return item.suburb == suburb;
        })[0].ssc_code);
      }
    }
    getData();
  }, [state, suburb, ssc]);

  React.useEffect(() => {
    function getChildrenCount() {
      var childrenCountJson = require('../../data/children_count.json');
      var x = childrenCountJson.filter(function(item){
        return item.state == state && item.asgs == suburb;
      });
      if(x.length != 0){
        setTotalChildren(x.filter(function(item){
          return item.composition == "Total";
        })[0].value);
        setSingleChildren(x.filter(function(item){
          return item.composition == "One parent family";
        })[0].value);
        setCoupleChildren(x.filter(function(item){
          return item.composition == "Couple family with children total";
        })[0].value);
      }
      var socioeconomics = require('../../data/socioeconomics.json');
      setSocioeconomic(socioeconomics.Sheet1.filter(function(item){
        return item.ssc == ssc;
      })[0]);
    }
    getChildrenCount();
  }, [state, suburb, socioeconomic, ssc]);

  var states = ["NSW", "VIC", "QLD", "TAS", "SA", "NT", "ACT", "WA"];
  var naturalDisasters = ["Flood", "Drought", "Bushfire", "Earthquake", "Hurricane", "Tsunami", "Volcano Eruption", "Cyclone", "Tornado"];
  var graphData = [
    { name: '0:00', sentimentRatio: 0.5, },
    { name: '1:00', sentimentRatio: 0.4, },
    { name: '2:00', sentimentRatio: 0.3, },
    { name: '3:00', sentimentRatio: 0.2, },
    { name: '4:00', sentimentRatio: 0.1, },
    { name: '5:00', sentimentRatio: 0, },
    { name: '6:00', sentimentRatio: -0.1, },
    { name: '7:00', sentimentRatio: -0.1, },
    { name: '8:00', sentimentRatio: -0.1, },
    { name: '9:00', sentimentRatio: -0.1, },
    { name: '10:00', sentimentRatio: -0.2, },
    { name: '11:00', sentimentRatio: -0.3, },
    { name: '12:00', sentimentRatio: -0.5, },
    { name: '13:00', sentimentRatio: -0.4, },
    { name: '14:00', sentimentRatio: -0.6, },
    { name: '15:00', sentimentRatio: -0.7, },
    { name: '16:00', sentimentRatio: -0.7, },
    { name: '17:00', sentimentRatio: -0.7, },
    { name: '18:00', sentimentRatio: -0.8, },
    { name: '19:00', sentimentRatio: -0.7, },
    { name: '20:00', sentimentRatio: -0.7, },
    { name: '21:00', sentimentRatio: -0.4, },
    { name: '22:00', sentimentRatio: -0.2, },
    { name: '23:00', sentimentRatio: -0.1, },
  ];
  return(
    <div>
      <AppBar position="static" style={{background:'#da291c'}}>
        <Toolbar>
          <Typography variant="h6">
            Save the Children - Amenities Optimization
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="text">
        <Typography variant="h2" component="h2">Search for a disaster: </Typography>
      </div>
      <div className="input">
        <Autocomplete
          id="states-dropdown"
          options={["Australia"]}
          style={{ width: 300 }}
          onInputChange={(event, newInputValue) => {
            setCountry(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Country" variant="outlined" required/>}
        />    
        <Autocomplete
          id="states-dropdown"
          options={states}
          style={{ width: 300 }}
          onInputChange={(event, newInputValue) => {
            setState(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="State" variant="outlined" required/>}
        />      
        <Autocomplete
          id="states-dropdown"
          options={suburbs}
          style={{ width: 300 }}
          getOptionLabel={(option) => option.suburb}
          onInputChange={(event, newInputValue) => {
            setSuburb(newInputValue);
          }}
          disabled={country == "" || state == ""}
          renderInput={(params) => <TextField {...params} label="Suburb" variant="outlined" required/>}
        />
        <Autocomplete
          id="states-dropdown"
          options={naturalDisasters}
          style={{ width: 300 }}
          onInputChange={(event, newInputValue) => {
            setDisaster(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Disaster" variant="outlined" required/>}
        />
      </div>
      {(country != "" && state != "" && suburb != "" &&  disaster != "") ? 
        <div>
          <div className="text">
            <Typography variant="h2" component="h2">Key statistics: </Typography>
          </div>          
          <div className="data-container">
            <div className="number-container">
              <Number value={totalChildren != 0 ? totalChildren : "N/A"} label="Total Children" />
              <Number value={coupleChildren != 0 ? coupleChildren : "N/A"} label="Children dependant on Married Couples" />
              <Number value={singleChildren != 0 ? singleChildren : "N/A"} label="Children dependant on Single Parents" />
              <Number value={totalChildren*5 != 0 ? totalChildren*5 : "N/A"} label="Total Adults" />
              <Number value={socioeconomic.score} label="Socio-Economic Score" />
              <Number value={-0.55} label={`Average Twitter Sentiment in ${suburb}`} />
            </div>
          </div>
          <div className="text">
            <Typography variant="h2" component="h2">Sentimental Analysis data from Twitter: </Typography>
          </div>
          <div className="data-container-graph">
            <div>
              <div className="text-h5">
                <Typography variant="h5" component="h5">Word Frequency of Impactful Words </Typography>
              </div>
              <WordTable/>
            </div>
            <div>
              <div className="text-h5">
                <Typography variant="h5" component="h5">Sentiment Ratio over a period of Time </Typography>
              </div>
              <Graph data={graphData}/>
            </div>
          </div>
          <div className="text">
            <Typography variant="h2" component="h2">Amenities optimization: </Typography>
          </div>
          <AmenitiesTable/>
        </div>
      : 
        <div>
        </div>
      }
    </div>
  );
}

export default Lookup;