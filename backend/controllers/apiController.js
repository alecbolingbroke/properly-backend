const axios = require("axios");

// Controller to access Mortgage Calculator API Controller
exports.calculateMortgage = async (req, res) => {
    // Extract data from request body
    const { loanAmount, homeValue, downPayment, interestRate, duration, annual_property_tax, monthly_hoa, annual_home_insurance } = req.body;
    console.log("Request Data:", req.body);  
  
    // Call Mortgage Calculator API
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/mortgagecalculator`, 
        {
        // POST request to Mortgage Calculator API with request body
          params: {
            loan_amount: loanAmount,
            home_value: homeValue,
            downpayment: downPayment,
            interest_rate: interestRate,
            duration_years: duration,
            annual_property_tax: annual_property_tax,
            monthly_hoa: monthly_hoa,
            annual_home_insurance: annual_home_insurance
          },
          headers: {
            "X-Api-Key": process.env.MORTGAGE_API_KEY,
          },
        }
      );
  
      console.log("API Response:", response.data); 
      // Send response back to frontend
      res.json(response.data);
    } catch (error) {
      console.error("Failed to fetch mortgage data:", error);
      res.status(500).json({ error: "Failed to fetch mortgage data" });
    }
  };
  