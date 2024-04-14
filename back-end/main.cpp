#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> v(n);
    for(int i = 0;i < n;i++) {
        cin >> v[i];
    }
    int tar; cin >> tar;
    map<int,int> mp;
    for(int i = 0;i < n;i++) {
        if(mp.find(tar - v[i]) != mp.end()) {
            cout << mp[tar - v[i]] << " " << i;
            break;
        }
        mp[v[i]] = i;
    }
    return 0;
}