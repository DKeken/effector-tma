import { useState, useEffect } from "react";
import { cloudStorage } from "effector-telegram-mini-app";

export function InputForm() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedValues, setSavedValues] = useState<string[]>([]);

  useEffect(() => {
    loadSavedValues();
    loadInitialValue();
  }, []);

  const loadSavedValues = async () => {
    try {
      const keys = await cloudStorage.getKeys();
      const values = await cloudStorage.getItems(keys);
      const nonNullValues = values.filter((v): v is string => v !== null);
      setSavedValues(nonNullValues);
    } catch (error) {
      console.error("Failed to load saved values:", error);
    }
  };

  const loadInitialValue = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const value = await cloudStorage.getItem("input-value");
      if (value) {
        setInputValue(value);
      }
    } catch (error) {
      setError("Failed to load initial value");
      console.error("Failed to load initial value:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!inputValue.trim()) {
      setError("Please enter some text before saving");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await cloudStorage.setItem({
        key: "input-value",
        value: inputValue,
      });
      await loadSavedValues();
      setError("Saved successfully!");
    } catch (error) {
      setError("Failed to save");
      console.error("Failed to save:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const value = await cloudStorage.getItem("input-value");
      if (value) {
        setInputValue(value);
      } else {
        setError("No saved value found");
      }
    } catch (error) {
      setError("Failed to load");
      console.error("Failed to load:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await cloudStorage.removeItem("input-value");
      setInputValue("");
      await loadSavedValues();
      setError("Cleared successfully!");
    } catch (error) {
      setError("Failed to clear");
      console.error("Failed to clear:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        {error && (
          <div style={{ color: error.includes("success") ? "green" : "red" }}>
            {error}
          </div>
        )}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setError(null);
        }}
        placeholder="Enter text"
        disabled={isLoading}
        style={{ marginBottom: 10 }}
      />

      <div>
        <button onClick={handleSave} disabled={isLoading || !inputValue.trim()}>
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button onClick={handleLoad} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load"}
        </button>
        <button onClick={handleClear} disabled={isLoading || !inputValue}>
          {isLoading ? "Clearing..." : "Clear"}
        </button>
      </div>

      {savedValues.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <h4>Saved values:</h4>
          <ul>
            {savedValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
