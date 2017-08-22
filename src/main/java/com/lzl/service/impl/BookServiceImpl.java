package com.lzl.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lzl.dao.BookDao;
import com.lzl.entity.Book;

//这里一定要加上service这个注解，这样spring初始化的时候会扫描该实现类
@Service
public class BookServiceImpl implements BookService{
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	

	@Autowired
	private BookDao bookDao;
	
	@Override
	public List<Book> query4books() {
		// TODO Auto-generated method stub
		return bookDao.query4books();
	}

}
