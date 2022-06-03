package com.example.total;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;

public class MainJoinLogin2 extends MainJoinLogin1 {

    Button ColorButton1, GrayButton1, JoinNext;
    ImageButton BackButton;
    EditText IdEdit, NickNameEdit;
    String aa, bb;

    private String NameValidation = "^[가-힣]{2,}";  //이름 정규식
    private String NickNameValidation = "^[가-힣]{2,11}";  //닉네임 정규식

    public static boolean flag1 = false;  //이름
    public static boolean flag2 = false;  //닉네임

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.joinlogin2);

        ColorButton1 = (Button)findViewById(R.id.colorbutton);  //1번 버튼
        GrayButton1 = (Button)findViewById(R.id.graybutton);  //2번 버튼
        JoinNext = (Button)findViewById(R.id.LoginNextButton);  //본인인증하고 회원가입 버튼

        IdEdit = (EditText) findViewById(R.id.Login1IdEditText);
        NickNameEdit = (EditText)findViewById(R.id.Login1PwdEditText);

        BackButton = (ImageButton)findViewById(R.id.BackButton);


        ColorButton1.setOnClickListener(new View.OnClickListener() {  //칼라버튼
            @Override
            public void onClick(View v) {
                ColorButton1.setBackgroundResource(R.drawable.circlebutton);
                GrayButton1.setBackgroundResource(R.drawable.graycirclebutton);
                Intent intent = new Intent(MainJoinLogin2.this, MainJoinLogin1.class);
                startActivity(intent);
            }
        });

        GrayButton1.setOnClickListener(new View.OnClickListener() {  //그레이버튼
            @Override
            public void onClick(View v) {
                ColorButton1.setBackgroundResource(R.drawable.graycirclebutton);
                GrayButton1.setBackgroundResource(R.drawable.circlebutton);

            }
        });

        IdEdit.addTextChangedListener(new TextWatcher() {   //유효성 검사 아직 안함
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                aa = IdEdit.getText().toString();
               /* if(aa.length() != 0) {
                    flag1 = true;
                }*/

                if(!(aa.matches(NameValidation))) {
                    IdEdit.setBackgroundResource(R.drawable.erroredit);
                    IdEdit.setTextColor(Color.parseColor("#191919"));
                    flag1 = false;

                }
                else {
                    IdEdit.setBackgroundResource(R.drawable.login1editshape);
                    IdEdit.setTextColor(Color.parseColor("#191919"));
                    flag1 = true;
                }


                if(aa.matches("")) {
                    flag1 = false;
                    IdEdit.setBackgroundResource(R.drawable.login1editshape);
                }

                if(flag1 == true && flag2 == true) {
                    JoinNext.setBackgroundResource(R.drawable.nextcolorbutton);
                    JoinNext.setTextColor(Color.parseColor("#FFFFFF"));
                }
                else {
                    JoinNext.setBackgroundResource(R.drawable.nextgraybutton);
                }
            }
        });

        NickNameEdit.addTextChangedListener(new TextWatcher() {     //유효성 검사 아직 안함
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                bb = NickNameEdit.getText().toString();
                if(!(bb.matches(NickNameValidation))) {
                    NickNameEdit.setBackgroundResource(R.drawable.erroredit);
                    NickNameEdit.setTextColor(Color.parseColor("#191919"));
                    flag2 = false;

                }
                else {
                    NickNameEdit.setBackgroundResource(R.drawable.login1editshape);
                    NickNameEdit.setTextColor(Color.parseColor("#191919"));
                    flag2 = true;
                }


                if(bb.matches("")) {
                    flag2 = false;
                    NickNameEdit.setBackgroundResource(R.drawable.login1editshape);
                }

                if(flag1 == true && flag2 == true) {
                    JoinNext.setBackgroundResource(R.drawable.nextcolorbutton);
                    JoinNext.setTextColor(Color.parseColor("#FFFFFF"));
                }
                else {
                    JoinNext.setBackgroundResource(R.drawable.nextgraybutton);
                }
            }
        });

        BackButton.setOnClickListener(new View.OnClickListener() {  //뒤로가기 버튼 클릭 시
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainJoinLogin2.this, MainJoinLogin1.class);
                startActivity(intent);
            }
        });

    }
}
