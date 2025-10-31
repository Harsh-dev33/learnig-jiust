#include <bits/stdc++.h>
using namespace std;

void piramid(int n){
    for (int i = 0; i < n; i++){
        for(int k=0;k<i;k++){
            cout<<" ";
        }
        for(int j=0;j<2*n-1;j++){
            cout<<"*";
            n--;
        }
        for(int l=0;l<i;l++){
            cout<<" ";
        }
        cout<<endl;
    }
    
}

int main(){
    piramid(4);
}