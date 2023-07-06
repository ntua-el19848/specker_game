/* A box with an image of all supported diagrams. 
   Down of the image exists a button that makes a call to orchestrator 
   for downloading the appropriate CSV template. 
   The images slides automatically after 2 seconds */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import config from "../config.json";

const ChartDemos = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set the autoplay speed in milliseconds
  };

  return (
    <Slider className="demo-chart" {...settings}>
      <demo-chart className="demo-chart">
        <h3>Basic Line Chart</h3>
        <img src="https://i.imgur.com/6vAE8bf.png" alt="basicLine" width="450" className="center" />
        <button className="centered-button" onClick={() => window.open('http://'+config.orchestrator+':4000/templateDownload/BasicLine', '_blank')}>Basic Line Template</button>
      </demo-chart>
      <demo-chart className="demo-chart">
        <h3>Line with Annotations Chart</h3>
        <img src="https://i.imgur.com/6sAlFnu.png" alt="annotationsLine" width="450" className="center" />
        <button className="centered-button" onClick={() => window.open('http://'+config.orchestrator+':4000/templateDownload/annotationsLine', '_blank')}>Annotations Line Template</button>
      </demo-chart>
      <demo-chart className="demo-chart">
        <h3>Basic Column Chart</h3>
        <img src="https://i.imgur.com/hzWOaaO.png" alt="basicColumn" width="450" className="center" />
        <button className="centered-button" onClick={() => window.open('http://'+config.orchestrator+':4000/templateDownload/BasicColumn', '_blank')}>Basic Column Template</button>
      </demo-chart>
      <demo-chart className="demo-chart">
        <h3>Dependency Wheel Chart</h3>
        <img src="https://i.imgur.com/I6eaXuQ.png" alt="dependency" width="450" className="center" />
        <button className="centered-button" onClick={() => window.open('http://'+config.orchestrator+':4000/templateDownload/dependency', '_blank')}>Dependency Wheel Template</button>
      </demo-chart>
      <demo-chart className="demo-chart">
        <h3>Network Chart</h3>
        <img src="https://i.imgur.com/r3pHMxc.png" alt="network" width="600" className="center" />
        <button className="centered-button" onClick={() => window.open('http://'+config.orchestrator+':4000/templateDownload/Network', '_blank')}>Network Template</button>
      </demo-chart>
      <demo-chart className="demo-chart">
        <h3>Polar Chart</h3>
        <img src="https://i.imgur.com/E45390j.png" alt="polar" width="450" className="center" />
        <button className="centered-button" onClick={() => window.open('http://'+config.orchestrator+':4000/templateDownload/Polar', '_blank')}>Polar Template</button>
      </demo-chart>
    </Slider>
  );
};

export default ChartDemos;
