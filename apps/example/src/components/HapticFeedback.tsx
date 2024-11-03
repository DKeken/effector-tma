import { hapticFeedback } from "effector-telegram-mini-app";

export function HapticFeedback() {
  const handleButtonPress = () => {
    // Light impact for button press feedback
    hapticFeedback.impactOccurred("light");
  };

  const handleSuccess = () => {
    // Success notification for completed actions
    hapticFeedback.notificationOccurred("success");
  };

  const handleError = () => {
    // Error notification for failed actions
    hapticFeedback.notificationOccurred("error");
  };

  const handleWarning = () => {
    // Warning notification for important alerts
    hapticFeedback.notificationOccurred("warning");
  };

  const handleSliderChange = () => {
    // Soft impact for continuous interactions
    hapticFeedback.impactOccurred("soft");
  };

  const handleToggle = () => {
    // Selection changed for toggle switches
    hapticFeedback.selectionChanged();
  };

  const handleHeavyAction = () => {
    // Heavy impact for significant actions
    hapticFeedback.impactOccurred("heavy");
  };

  return (
    <div>
      <h2>Haptic Feedback Demo</h2>
      
      <div style={{ marginBottom: 20 }}>
        <h3>Basic Interactions</h3>
        <button onClick={handleButtonPress}>
          Button Press (Light Impact)
        </button>
        <button onClick={handleToggle}>
          Toggle Switch
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>Notifications</h3>
        <button onClick={handleSuccess}>
          Success Notification
        </button>
        <button onClick={handleError}>
          Error Notification
        </button>
        <button onClick={handleWarning}>
          Warning Notification
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>Special Actions</h3>
        <button onClick={handleHeavyAction}>
          Heavy Impact
        </button>
        <input 
          type="range" 
          onChange={handleSliderChange}
          min="0"
          max="100"
        />
        <div>Slider with Soft Impact</div>
      </div>
    </div>
  );
}
