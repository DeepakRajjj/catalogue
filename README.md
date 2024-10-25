# catalogue
# Polynomial Secret Finder

A JavaScript implementation to find the constant term of a polynomial using Lagrange interpolation. This project is designed to work with encoded polynomial roots provided in JSON format.

## Problem Statement

Given an unknown polynomial of degree m, represented as:
`f(x) = a_m x^m + a_{m-1} x^{m-1} + ... + a_1 x + c`

The program finds the constant term 'c' using the provided roots. These roots are encoded in different bases and need to be decoded before processing.

## Setup

1. Clone this repository:
```bash
git clone <your-repo-url>
cd polynomial-secret
```

2. Install dependencies:
```bash
npm install
```

## File Structure
```
polynomial-secret/
├── main.js         # Main program logic
├── data1.json      # First test case
├── data2.json      # Second test case
├── package.json    # Project dependencies
└── README.md       # This file
```

## Input Format

The input is provided in JSON format. Example:
```json
{
    "keys": {
        "n": 4,    // Number of roots provided
        "k": 3     // Minimum roots needed (degree + 1)
    },
    "1": {
        "base": "10",    // Base of the encoded value
        "value": "4"     // Encoded value
    }
    // ... more roots
}
```

## Running the Program

```bash
node main.js
```

This will process both test cases and output their respective secrets.

## Dependencies

- bignumber.js: For handling large number calculations with precision

## Implementation Details

- Uses Lagrange interpolation for polynomial reconstruction
- Handles various base encodings (2-36)
- Processes multiple test cases
- Maintains precision for large numbers

## Constraints

- All coefficients are positive integers
- Coefficients are within 256-bit number range
- Number of roots provided (n) ≥ minimum required roots (k)
- Polynomial degree (m) = k - 1

## Expected Output

The program will output:
```
Secret for Test Case 1: 3
Secret for Test Case 2: 79836264049851.00000000000000000043
```

## Author

Deepak Raj
