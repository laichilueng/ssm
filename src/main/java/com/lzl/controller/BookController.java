package com.lzl.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lzl.entity.Book;
import com.lzl.service.impl.BookService;

@Controller
@RequestMapping("/")
public class BookController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private BookService service;
	
// 该方法将请求映射到Book.jsp这个页面上
	@RequestMapping("/book")
	public String toBookPage(HttpServletRequest request){
		List<Book> list = service.query4books();
//		这里在请求Book页面时，查询所有的book并将其存到request里面
		if(list != null){
			for(Book book : list){
				logger.info(book.toString());
			}
			request.setAttribute("books", list);
		}
//		返回string类型，jsp渲染器会自动寻找/jsp/Book.jsp
		return "Book";
	}
}
