package com.example.total;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder>{
    public class ViewHolder extends RecyclerView.ViewHolder {
        ImageView imgView_item;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            imgView_item = (ImageView) itemView.findViewById(R.id.imgView_item);
        }
    }

    private ArrayList<RecyclerViewItem> mList = null;

    public RecyclerViewAdapter(ArrayList<RecyclerViewItem> mList) {
        this.mList = mList;
    }

    // 아이템 뷰를 위한 뷰홀더 객체를 생성하여 리턴
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        View view = inflater.inflate(R.layout.activity_recycler_item, parent, false);
        RecyclerViewAdapter.ViewHolder vh = new RecyclerViewAdapter.ViewHolder(view);
        return vh;
    }

    // position에 해당하는 데이터를 뷰홀더의 아이템뷰에 표시
    @Override
    public void onBindViewHolder(@NonNull RecyclerViewAdapter.ViewHolder holder, int position) {
        RecyclerViewItem item = mList.get(position);

        holder.imgView_item.setImageResource(R.drawable.mangwon);   // imageView에 들어갈 이미지 설정
    }

    @Override
    public int getItemCount() {
        return mList.size();
    }

}
