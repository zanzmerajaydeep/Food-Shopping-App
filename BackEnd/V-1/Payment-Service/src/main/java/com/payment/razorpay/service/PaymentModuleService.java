package com.payment.razorpay.service;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PaymentModuleService {
	

	 private final String apiKey = "rzp_test_E5HB0Ue75U8GWK";
	    private final String apiSecret = "ebPoqAQ6jjA53dIlzZwwoNiZ";

	    public String createOrder(Map<String, Object> requestData) throws RazorpayException {
	        int amount = extractAmount(requestData);
	        
	        if (amount < 1) {
	            throw new IllegalArgumentException("Amount must be at least 1 INR.");
	        }


	        RazorpayClient client = new RazorpayClient(apiKey, apiSecret);

	        JSONObject orderRequest = new JSONObject();
	        orderRequest.put("amount", amount*100);  // Keep the amount in rupees
	        orderRequest.put("currency", "INR");
	        orderRequest.put("receipt", "order_rcptid_11");

	        Order order = client.orders.create(orderRequest);

	        return order.toString();
	    }


	    private int extractAmount(Map<String, Object> requestData) {
	        Object amountObject = requestData.get("amount");

	        if (amountObject == null) {
	            throw new IllegalArgumentException("Amount is required");
	        }

	        if (amountObject instanceof Integer) {
	            return (int) amountObject;
	        } else if (amountObject instanceof String) {
	            try {
	                // Parse the string amount directly
	                return Integer.parseInt((String) amountObject);
	            } catch (NumberFormatException e) {
	                throw new IllegalArgumentException("Invalid 'amount' format. Must be a valid integer.");
	            }
	        } else {
	            throw new IllegalArgumentException("Invalid 'amount' format. Must be either Integer or String.");
	        }
	    }




}
