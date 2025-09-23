
import './Spinner.css';

const Spinner: React.FC = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p className="spinner-text">Loading posts... Please wait while we wake up the server</p>
        </div>
    );
};

export default Spinner;