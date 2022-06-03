package com.example.total;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

public class MainIntroLogin extends MainActivity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.intrologin);

        /*Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(MainIntroLogin.this, MainLogin.class); //화면 전환
                startActivity(intent);

            }
        }, 4000); //딜레이 타임 조절*/


        Button LoginButton = (Button)findViewById(R.id.LoginButton);
        LoginButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(MainIntroLogin.this, MainLogin.class);
                startActivity(intent);
            }
        });

    }
}
