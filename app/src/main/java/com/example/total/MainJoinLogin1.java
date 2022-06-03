package com.example.total;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.provider.ContactsContract;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import org.w3c.dom.Text;

public class MainJoinLogin1 extends MainLogin {

    static int num = 0;

    String Idtext, Pwdtext, Pwdtext2, Emailtext;

    Button ColorButton1, GrayButton1;
    Button LoginNextButton1;
    ImageButton BackButton;
    EditText IdEdit, PwdEdit, PwdEdit2, EmailEdit;

    //유효성검사(아이디, 비밀번호, 이메일)
    private String IdValidation = "^[a-zA-Z0-9]{5,11}";
    private String PwdValidation = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&]).{8,}.$";  //숫자, 영문, 특수문자 최소 8자 이상
    private String emailValidation = "^[_A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    //EditText 4개 다 적었는지 확인용
    static boolean flag1 = false;
    static boolean flag2 = false;
    static boolean flag3 = false;
    static boolean flag4 = false;

    String aa, bb, cc, dd;
    public static String bb1;  //비밀번호 맞는지?

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.joinlogin1);

        ColorButton1 = (Button)findViewById(R.id.colorbutton);  //1번 버튼
        GrayButton1 = (Button)findViewById(R.id.graybutton);  //2번 버튼
        BackButton = (ImageButton) findViewById(R.id.BackButton);

        LoginNextButton1 = (Button)findViewById(R.id.LoginNextButton);  //다음 버튼

        IdEdit = (EditText)findViewById(R.id.Login1IdEditText);  //아이디 입력 Edit
        PwdEdit = (EditText)findViewById(R.id.Login1PwdEditText);
        PwdEdit2 = (EditText)findViewById(R.id.Login1PwdEditText1);
        EmailEdit = (EditText)findViewById(R.id.Login1EmailEditText);

        //색 변경, 화면넘김 아직!!
        ColorButton1.setOnClickListener(new View.OnClickListener() {  //칼라버튼
            @Override
            public void onClick(View v) {
                ColorButton1.setBackgroundResource(R.drawable.circlebutton);
                GrayButton1.setBackgroundResource(R.drawable.graycirclebutton);
            }
        });

        IdEdit.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                aa = IdEdit.getText().toString();

                if(!(aa.matches(IdValidation))) {
                    IdEdit.setBackgroundResource(R.drawable.erroredit);
                    IdEdit.setTextColor(Color.parseColor("#191919"));
                    flag1 = false;

                }
                else {
                    IdEdit.setBackgroundResource(R.drawable.login1editshape);
                    IdEdit.setTextColor(Color.parseColor("#191919"));
                    flag1 = true;
                }

                /*if(aa.length() != 0) {
                    flag1 = true;
                }*/

                if(aa.matches("")) {
                    flag1 = false;
                    IdEdit.setBackgroundResource(R.drawable.login1editshape);
                }

                if(flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextcolorbutton);
                    LoginNextButton1.setTextColor(Color.parseColor("#FFFFFF"));
                }
                else {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextgraybutton);
                }
            }
        });

        PwdEdit.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                bb = PwdEdit.getText().toString();
                bb1 = PwdEdit.getText().toString();

                if(!(bb.matches(PwdValidation))) {
                    PwdEdit.setBackgroundResource(R.drawable.erroredit);
                    PwdEdit.setTextColor(Color.parseColor("#191919"));
                    flag2 = false;
                }
                else {
                    PwdEdit.setBackgroundResource(R.drawable.login1editshape);
                    PwdEdit.setTextColor(Color.parseColor("#191919"));
                    flag2 = true;

                }

                /*if(bb.length() != 0) {
                    flag2 = true;
                }*/

                if(bb.matches("")) {
                    flag2 = false;
                    PwdEdit.setBackgroundResource(R.drawable.login1editshape);  //썼다가 지웠을 때 오류 사라짐
                }

                if(flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextcolorbutton);
                    LoginNextButton1.setTextColor(Color.parseColor("#FFFFFF"));
                }
                else {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextgraybutton);
                }
            }
        });

        PwdEdit2.addTextChangedListener(new TextWatcher() {  //비밀번호 재입력
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                cc = PwdEdit2.getText().toString();

                if(!(cc.equals(bb1))) {  //비밀번호가 일치하지 않는다면
                    PwdEdit2.setBackgroundResource(R.drawable.erroredit);
                    PwdEdit2.setTextColor(Color.parseColor("#191919"));
                    flag3 = false;
                }
                else {
                    PwdEdit2.setBackgroundResource(R.drawable.login1editshape);
                    PwdEdit2.setTextColor(Color.parseColor("#191919"));
                    flag3 = true;
                }

               /* if(cc.length() != 0) {
                    flag3 = true;
                }*/

                if(cc.matches("")) {
                    flag3 = false;
                    PwdEdit2.setBackgroundResource(R.drawable.login1editshape); //썼다가 지웠을 때 오류 사라짐
                }

                if(flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextcolorbutton);
                    LoginNextButton1.setTextColor(Color.parseColor("#FFFFFF"));
                }
                else {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextgraybutton);
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
                dd = EmailEdit.getText().toString();

                if(!(dd.matches(emailValidation) && s.length() > 0)) {
                    // Toast.makeText(getApplicationContext(), "이메일형식으로 입력해주세요", Toast.LENGTH_SHORT).show();
                    EmailEdit.setBackgroundResource(R.drawable.erroredit);
                    EmailEdit.setTextColor(Color.parseColor("#191919"));
                    flag4 = false;
                }
                else {
                    EmailEdit.setBackgroundResource(R.drawable.login1editshape);
                    EmailEdit.setTextColor(Color.parseColor("#191919"));
                    flag4 = true;
                }

              /*  if(dd.length() != 0) {
                    flag4 = true;
                }*/

                if(dd.matches("")) {
                    flag4 = false;
                    EmailEdit.setBackgroundResource(R.drawable.login1editshape);
                }

                if(flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextcolorbutton);
                    LoginNextButton1.setTextColor(Color.parseColor("#FFFFFF"));
                }
                else {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextgraybutton);
                }
            }
        });

        LoginNextButton1.setOnClickListener(new View.OnClickListener() {  //하단 다음 버튼
            @Override
            public void onClick(View v) {
                if(flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    Intent intent = new Intent(MainJoinLogin1.this, MainJoinLogin2.class);
                    startActivity(intent);
                }
            }
        });

        BackButton.setOnClickListener(new View.OnClickListener() {  //뒤로가기 버튼 클릭 시
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainJoinLogin1.this, MainLogin.class);
                startActivity(intent);
            }
        });

        /*Idtext = IdEditText.getText().toString();
        Pwdtext = PwdEditText.getText().toString();
        Pwdtext2 = PwdEditText2.getText().toString();
        Emailtext = EmailEditText.getText().toString();

        final TextWatcher textWatcher = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                if(s.length() != 0 ) {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextcolorbutton);

                }
                else {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextgraybutton);

                }
            }
        };*/

       /* IdEditText.addTextChangedListener(textWatcher);
        PwdEditText2.addTextChangedListener(textWatcher);*/

       /* //아이디 입력 시 버튼 색상 변경경
       IdEditText.addTextChangedListener(new TextWatcher() {

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                if(s.length() != 0 ) {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextcolorbutton);

                }
                else {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextgraybutton);

                }

            }
        });
*/



        /*LoginNextButton1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Idtext = IdEditText.getText().toString();
                Pwdtext = PwdEditText.getText().toString();
                Pwdtext2 = PwdEditText2.getText().toString();
                Emailtext = EmailEditText.getText().toString();

                if(Idtext.length() == 0 || Pwdtext.length() == 0 || Pwdtext2.length() ==0 || Emailtext.length() == 0) {
                    Toast toast = Toast.makeText(getApplicationContext(), "입력을 모두 해주세요.", Toast.LENGTH_LONG);
                    toast.show();
                }
                else {
                    LoginNextButton1.setBackgroundResource(R.drawable.nextcolorbutton);
                }
            }
        });*/



    }
}
