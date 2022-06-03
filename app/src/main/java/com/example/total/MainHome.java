package com.example.total;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.viewpager2.adapter.FragmentStateAdapter;
import androidx.viewpager2.widget.ViewPager2;
import androidx.recyclerview.widget.RecyclerView;

import  java.util.ArrayList;

import me.relex.circleindicator.CircleIndicator3;

public class MainHome extends AppCompatActivity {

    //ViewPager 변수
    private ViewPager2 mPager;
    private FragmentStateAdapter pagerAdapter;
    private int num_page = 4;
    private CircleIndicator3 mIndicator;

    //Recycler 변수
    private RecyclerView mRecyclerView;
    private ArrayList<RecyclerViewItem> mList;
    private RecyclerViewAdapter mRecyclerViewAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home);
        //Recycler
        firstInit();
        addItem("mangwon");
        addItem("tongin");
        addItem("mangwon");
        addItem("tongin");

        mRecyclerViewAdapter = new RecyclerViewAdapter(mList);
        mRecyclerView.setAdapter(mRecyclerViewAdapter);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this, RecyclerView.HORIZONTAL, false));

        //ViewPager2
        mPager = findViewById(R.id.viewpager);

        pagerAdapter = new MyAdapter(this, num_page);
        mPager.setAdapter(pagerAdapter);
        //Indicator
        mIndicator = findViewById(R.id.indicator);
        mIndicator.setViewPager(mPager);
        mIndicator.createIndicators(num_page,0);
        //ViewPager Setting
        mPager.setOrientation(ViewPager2.ORIENTATION_HORIZONTAL);

        mPager.setCurrentItem(1000); //시작 지점
        mPager.setOffscreenPageLimit(4); //최대 이미지 수

        mPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
                super.onPageScrolled(position, positionOffset, positionOffsetPixels);
                if (positionOffsetPixels == 0) {
                    mPager.setCurrentItem(position);
                }
            }

            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);
                mIndicator.animatePageSelected(position%num_page);
            }
        });
    }

    //Recycler
    public void firstInit() {
        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        mList = new ArrayList<>();
    }
    public void addItem(String imgName){
        RecyclerViewItem item = new RecyclerViewItem();

        item.setImgName(imgName);

        mList.add(item);
    }
}
