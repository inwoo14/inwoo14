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

public class MainFindPwd extends MainLogin {

    Button FindId, FindPwd, FindPwdNext;
    EditText IdEdit, EmailEdit;
    ImageButton BackButton;

    String aa, bb;

    //이메일 유효성
    private String emailValidation = "^[_A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    public static boolean flag1 = false;
    public static boolean flag2 = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.findpassword);

        FindId = (Button)findViewById(R.id.button3);
        FindPwd = (Button)findViewById(R.id.button4);

        FindPwdNext = (Button)findViewById(R.id.button5);  //비밀번호 찾기 버튼

        BackButton = (ImageButton)findViewById(R.id.BackButton);  //뒤로가기 버튼

        IdEdit = (EditText)findViewById(R.id.editTextTextPersonName3);
        EmailEdit = (EditText)findViewById(R.id.editTextTextPersonName4);

        FindId.setOnClickListener(new View.OnClickListener() {      //비밀번호찾기 버튼
            @Override
            public void onClick(View v) {
                FindId.setBackgroundResource(R.drawable.findidbutton);
                FindPwd.setBackgroundResource(R.drawable.findpwdbutton);
                Intent intent = new Intent(MainFindPwd.this, MainFindID.class);
                startActivity(intent);
            }
        });

        IdEdit.addTextChangedListener(new TextWatcher() {  //유효성 검사 아직 안됌!
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                aa = IdEdit.getText().toString();
                if(aa.length() != 0) {
                    flag1 = true;
                }

                if(aa.matches("")) {
                    flag1 = false;
                }

                if(flag1 == true && flag2 == true) {
                    FindPwdNext.setBackgroundResource(R.drawable.nextcolorbutton);
                }
                else {
                    FindPwdNext.setBackgroundResource(R.drawable.nextgraybutton);
                }
            }
        });

        EmailEdit.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                bb = EmailEdit.getText().toString();

                //이메일 유효성 검사
                if(!(bb.matches(emailValidation) && s.length() > 0)) {
                    // Toast.makeText(getApplicationContext(), "이메일형식으로 입력해주세요", Toast.LENGTH_SHORT).show();
                    EmailEdit.setBackgroundResource(R.drawable.erroredit);
                    EmailEdit.setTextColor(Color.parseColor("#191919"));
                    flag2 = false;
                }
                else {
                    EmailEdit.setBackgroundResource(R.drawable.login1editshape);
                    EmailEdit.setTextColor(Color.parseColor("#191919"));
                    flag2 = true;
                }


               /* if(bb.length() != 0) {
                    flag2 = true;
                }*/

                if(bb.matches("")) {
                    flag2 = false;
                    EmailEdit.setBackgroundResource(R.drawable.login1editshape);
                }

                if(flag1 == true && flag2 == true) {
                    FindPwdNext.setBackgroundResource(R.drawable.nextcolorbutton);
                    FindPwdNext.setTextColor(Color.parseColor("#FFFFFF"));
                }
                else {
                    FindPwdNext.setBackgroundResource(R.drawable.nextgraybutton);
                }
            }
        });

        BackButton.setOnClickListener(new View.OnClickListener() {  //뒤로가기 버튼 클릭 시
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainFindPwd.this, MainLogin.class);
                startActivity(intent);
            }
        });




    }
}


