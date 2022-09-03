package com.example.patientpig;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!!!";
	}

	@RequestMapping(value = "/first", method = RequestMethod.GET)
	public String firstController(){
		return "Hello, I'm first api.";
	}
}
