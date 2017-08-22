package com.lzl.dao;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.lzl.BaseTest;
import com.lzl.entity.Book;

public class TestBookDao extends BaseTest{
	
	@Autowired
	private BookDao dao;
	
	@Test
	public void testquery4books(){
		List<Book> list = new ArrayList<Book>();
		list = dao.query4books();
		for(Book book : list){
			System.out.println(book.toString());
		}
	}
}
