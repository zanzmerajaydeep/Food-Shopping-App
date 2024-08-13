package com.example.demo.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class UserConfig {
	
	
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
	{
		
		return http.csrf().disable()
				.authorizeHttpRequests()
				.requestMatchers("/validateUser","/welcome","/addUSer","/fetchAll","/fetch","/adduserDetails").permitAll()
				.and()
				.build();

	}
	
      @Bean
      public UserDetailsService userDetailsService( PasswordEncoder encorder)
  	{
  		UserDetails admin=User.withUsername("user")
  				.password("user")
  				.roles("ADMIN")
  				.build();
  		
  	   UserDetails user=User.withUsername("admin")
  				.password("admin")
  				.roles("USER")
  				.build();
  	   
  	   return new InMemoryUserDetailsManager(admin,user);
  	}

    @Bean
    PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
 
	

	
	

}
