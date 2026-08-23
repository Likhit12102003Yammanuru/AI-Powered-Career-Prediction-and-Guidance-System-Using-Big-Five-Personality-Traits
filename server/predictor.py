import sys
import io
import json
import numpy as np
import joblib

# Fix Unicode output on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')


def predict_career(O, C, E, A, N):
    # Load preprocessing tools
    scaler = joblib.load("scaler.pkl")
    label_encoder = joblib.load("label_encoder.pkl")
    
    # Load the ensemble model
    model = joblib.load("career_model.pkl")

    # Prepare data
    traits = np.array([[O, C, E, A, N]])
    traits_scaled = scaler.transform(traits)

    # Predict
    predicted_class_idx = model.predict(traits_scaled)[0]

    # Map numeric label back to job cluster name
    predicted_label = label_encoder.inverse_transform([predicted_class_idx])[0]

    return predicted_label


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input data provided"}))
        sys.stdout.flush()
        sys.exit(1)

    try:
        data = json.loads(sys.argv[1])
        O = float(data["O"])
        C = float(data["C"])
        E = float(data["E"])
        A = float(data["A"])
        N = float(data["N"])
    except Exception as e:
        print(json.dumps({"error": f"Invalid input data: {str(e)}"}))
        sys.stdout.flush()
        sys.exit(1)

    prediction = predict_career(O, C, E, A, N)
    print(json.dumps({"prediction": prediction}))
    sys.stdout.flush()


if __name__ == "__main__":
    main()
