import { Monitor, Smartphone } from 'lucide-react';
import './DeviceToggle.css';

const DeviceToggle = ({ mode, setMode }) => {
    return (
        <div className="device-toggle-wrapper">
            <div className="device-toggle-container">
                <button
                    className={`device-toggle-btn ${mode === 'desktop' ? 'active' : ''}`}
                    onClick={() => setMode('desktop')}
                    aria-label="Desktop View"
                    title="Desktop View"
                >
                    <Monitor size={18} />
                </button>
                <div className="device-toggle-divider" />
                <button
                    className={`device-toggle-btn ${mode === 'mobile' ? 'active' : ''}`}
                    onClick={() => setMode('mobile')}
                    aria-label="Mobile View"
                    title="Mobile View"
                >
                    <Smartphone size={18} />
                </button>
            </div>
        </div>
    );
};

export default DeviceToggle;
