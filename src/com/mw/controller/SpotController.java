package com.mw.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mw.frame.Service;
import com.mw.service.SpotService;
import com.mw.vo.Comment;
import com.mw.vo.Lnglat;
import com.mw.vo.Spot;

@Controller
public class SpotController {
	
	@Resource(name="sservice")
	Service<Spot, String> service;
	
	@Resource(name="sservice")
	SpotService sservice;
	
	@RequestMapping("/addspot.mw")
	public ModelAndView addspot() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("main");
		mv.addObject("centerpage", "spot/add");
		return mv; // Spot/add.jsp
	}
	
	@RequestMapping("/getspots.mw")
	public void getspots(HttpServletRequest request, HttpServletResponse response)  {
		double startLng = Double.parseDouble(request.getParameter("nwlng"));
		double startLat = Double.parseDouble(request.getParameter("nwlat"));
		double endLng = Double.parseDouble(request.getParameter("selng"));
		double endLat = Double.parseDouble(request.getParameter("selat"));
		
		System.out.printf("ilng: %f, ilat: %f, elng: %f, elat: %f\n",
				startLng,startLat,
				endLng, endLat);
		if(startLng > endLng) {
			double tmp = startLng;
			startLng = endLng;
			endLng = tmp;
		}
		
		if(startLat > endLat) {
			double tmp = startLat;
			startLat = endLat;
			endLat = tmp;
		}
				
		JSONArray ja = new JSONArray();
	    
		try {

			List<Spot> spots = sservice.getByLnglat(new Lnglat(startLng, startLat, endLng, endLat));
				
			System.out.println("The size is : "+ spots.size());
			
			for(Spot spot : spots) {
				JSONObject jo = new JSONObject();
			    jo.put("id", spot.getId());
			    jo.put("lng", spot.getLng());
			    jo.put("lat", spot.getLat());
			    jo.put("category", spot.getCategory());
			    ja.add(jo);	
			}
		    
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
			    
	    try {
	    	response.setContentType("text/json; charset=EUC-KR");
			PrintWriter writer = response.getWriter(); 
			writer.print(ja);
	    } catch (IOException e) {
	        e.printStackTrace();
	    } 
	}
	
	@RequestMapping("/deletespot.mw")
	public ModelAndView delspot() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("main");
		mv.addObject("centerpage", "spot/add");
		return mv; // Spot/add.jsp
	}
	

	
}