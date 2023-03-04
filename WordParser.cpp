// File is going to be for parsing through the list of words and taking out all unnecesarry ones

#include<vector>
#include<string>
#include<iostream>
#include<fstream>
#include<unordered_map>



int main(void) {

    std::string line;
    std::vector<std::string> dict;
    std::vector<std::string> gooddict;

    std::ifstream wordlist("english.txt");

    if(!wordlist) {
        std::cout << "error opening" << std::endl;
        system("Pause");
        return -1;
    }
    while(std::getline(wordlist,line)) {
        dict.push_back(line);
    }

    for (int i = 0; i < dict.size(); i++) {
        bool goodword = true;
        for (int j = 0; j < dict[i].size(); j++) {
            if (dict[i].size() <= 3) {
                goodword = false;
                break;
            }
            if (dict[i][j] < 97 || dict[i][j] > 122) {
                goodword = false;
                break;
            }
        }
        if (goodword) {
            gooddict.push_back(dict[i]);
        }
    }

    std::unordered_map<std::string,int> mpp;

    for (int i = 0; i < gooddict.size(); i++) {
        mpp[gooddict[i]]++;
    }

    std::vector<std::string> goodlist3;

    for (int i = 0; i < gooddict.size(); i++) {
        bool goodword = true;
        if (gooddict[i].back() == 's') {
            std::string s = gooddict[i];
            s.pop_back();
            if (mpp[s] > 0) {
                goodword = false;
            }
        }
        if (goodword == true) {
            goodlist3.push_back(gooddict[i]);
        }
       
    }

    

    std::fstream wordlist2;

    wordlist2.open("Newdict.txt",std::ios_base::out);

    for (int i = 0; i < goodlist3.size(); i++) {
        wordlist2 << goodlist3[i] << std::endl;
    }

    wordlist2.close();

    std::cout << dict.size() << " " << gooddict.size() << " " << goodlist3.size() << std::endl;

    
    

    return 0;
}