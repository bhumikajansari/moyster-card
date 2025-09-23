# MoysterCard Fare Engine

This project implement of calculate the fare (fare calculation engine) for the MoysterCard System.

Calculate fares, applying peak and off-peak, daily caps and weekly caps.

## Project Structure
```
moyster-card/
├── src/
│   ├── fareCalculator.ts     # main fare calculation logic
│   ├── index.ts              # CLI entrypoint
│   ├── peakHours.ts          # peak/off-peak time logic
│   ├── utils.ts              # helper functions
│   ├── zoneFares.ts          # fare & cap configuration
│   └── tests/
│       └── fareCalculator.test.ts   # Jest unit tests
├── data/
│   └── journeys.json         # sample journeys (input)
├── package.json
├── package-lock.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Features
- Easy to configuration Zones, ZoneFares, Daily Caps, Weekly Caps.
-  Calculate per journey fare based on peak and off-peak rules
-  Applies daily caps based on farthest zones used on that day.
-  Applies weekly caps based on farthest zones used on that week.
-  Handle partial charging when caps are reached mid-journey.
-  Include unit tests with Jest.

## Setup 
Clone git repo and install dependencies
```bash
git clone https://github.com/bhumikajansari/moyster-card.git
```
```bash
npm install
```
	
## Run
Open CLI/Terminal
```bash
npm start
```

return output of calculate journey fare example Output: 600 (as per assigment require)

## Test
Open CLI/Terminal
```bash
npm test
```

### Test Cases:
- Daily cap Weekday and Weekend - Zone 1-2, Zone 1, Zone 2
- Weekly cap - Zone 1-2, Zone 1, Zone 2
- Invalis Journey data
- Boundry Cases - peak and off-peak - Zone 1-2, Zone 1, Zone 2
- Partial charging when caps are hit mid-day or mid-week

## Code Principle
- Encapsulation:
	- All fare calculate is in pure functions.
- YAGNI:
	- no unnecessary/unused code or design
- KISS:
	- Use functional modules, simple folder structure.
- SOLID Principle:
	- Single reponsibility: each module has one purpose. (zoneFares, utils, peakHours)
	- Open/Closed: all zone, fares and caps configure in zoneFares.ts
	- Liskov Substitution: no inheritance
	- Interface Segregation: Journey interface is minimal.
	- Dependency Inversion: all values are configaration, not hard-coded in logic.
- Refactoring:
	- Logic split into small modules so easy to read and testing.
- Simplicity

## Submission
- src/ - source code and unit testing
- data/journey.json - sample data
- README.md - documentation
