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
import android.widget.Toast;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainFindID extends MainLogin {

    Button FindId, FindPwd, FindIdNext;
    EditText NameEdit, EmailEdit;
    ImageButton BackButton;

    String aa, bb;
    boolean Emailflag = true;
    String EmailText;

    //이메일, 이름 유효성 검사
    private String emailValidation = "^[_A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    private String IdValidation= ("^[ㄱ-ㅎ가-힣]+$");

    public static boolean flag1 = false;
    public static boolean flag2 = false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.findid);

        FindId = (Button)findViewById(R.id.button3);  //상단 아이디 찾기버튼
        FindPwd = (Button)findViewById(R.id.button4);  //상단 비밀번호 찾기 버튼
        FindIdNext = (Button)findViewById(R.id.button5);  //하단 아이디 찾기 버튼

        BackButton = (ImageButton)findViewById(R.id.BackButton);  //뒤로가기 버튼

        NameEdit = (EditText)findViewById(R.id.editTextTextPersonName3);  //이름 edit
        EmailEdit = (EditText)findViewById(R.id.editTextTextPersonName4);  //이메일 edit



        FindPwd.setOnClickListener(new View.OnClickListener() {      //비밀번호찾기 버튼
            @Override
            public void onClick(View v) {
                FindId.setBackgroundResource(R.drawable.findpwdbutton);
                FindPwd.setBackgroundResource(R.drawable.findidbutton);
                Intent intent = new Intent(MainFindID.this, MainFindPwd.class);  //화면 이동
                startActivity(intent);
            }
        });

        NameEdit.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                aa = NameEdit.getText().toString();

                if(!(aa.matches(IdValidation) && s.length() >= 2)) {
                    NameEdit.setBackgroundResource(R.drawable.erroredit);
                    NameEdit.setTextColor(Color.parseColor("#191919"));
                    flag1 = false;
                }
                else {
                    NameEdit.setBackgroundResource(R.drawable.login1editshape);
                    NameEdit.setTextColor(Color.parseColor("#191919"));
                    flag1 = true;
                }

               /* if(aa.length() != 0) {
                    flag1 = true;
                }*/

                if(aa.matches("")) {
                    flag1 = false;
                    NameEdit.setBackgroundResource(R.drawable.login1editshape);
                }

                if(flag1 == true && flag2 == true) {
                    FindIdNext.setBackgroundResource(R.drawable.nextcolorbutton);
                }
                else {
                    FindIdNext.setBackgroundResource(R.drawable.nextgraybutton);
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
                    FindIdNext.setBackgroundResource(R.drawable.nextcolorbutton);
                    FindIdNext.setTextColor(Color.parseColor("#FFFFFF"));
                }
                else {
                    FindIdNext.setBackgroundResource(R.drawable.nextgraybutton);
                }
            }
        });

        /*EmailEdit.setOnFocusChangeListener(new View.OnFocusChangeListener() {

            @Override
            public void onFocusChange(View v, boolean hasFocus) {

                    if (hasFocus) {
                        Pattern p = Pattern.compile("^[a-zA-X0-9]@[a-zA-Z0-9].[a-zA-Z0-9]");
                        Matcher m = p.matcher((EmailEdit).getText().toString());


                        if (!m.matches()) {
                            Toast.makeText(getApplicationContext(), "Email형식으로 입력하세요", Toast.LENGTH_SHORT).show();

                        }
                    }
            }
        });*/

        BackButton.setOnClickListener(new View.OnClickListener() {  //뒤로가기 버튼 클릭 시
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainFindID.this, MainLogin.class);
                startActivity(intent);
            }
        });

    }
}
