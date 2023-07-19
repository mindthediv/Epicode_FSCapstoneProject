package com.wearecr.wearecrapplication.security.exceptions;

import org.springframework.http.HttpStatus;

public class MyAPIException extends Exception{
    private HttpStatus status; 
    public MyAPIException(HttpStatus s, String m) {
        super(m);
        this.status = s;
    }
}
