package com.example.total;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

public class Loading extends MainActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Handler handler = new Handler();

        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(Loading.this, MainActivity.class); //화면 전환
                overridePendingTransition(0, 0);
                startActivity(intent);
            }
        }, 4000); //딜레이 타임 조절
    }
}
