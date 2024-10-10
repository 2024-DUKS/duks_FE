import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import sampleImage1 from "../img/sample1.png";  
import sampleImage2 from "../img/sample2.png";
import { 
  PostListBox, PostItem, PostImage, PostContent, 
  PostInfo, PostDetails, PostPrice, PostTitle, HeartContainer, HeartIcon, HeartCount2 
} from "../styles/HumanPageStyle";

const Search = () => {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || ""; // location.state가 null일 경우 빈 문자열로 처리
  const [filteredPosts, setFilteredPosts] = useState([]);

  // 예시 게시물 목록
  const postList = [
    { id: 1, category: "해드립니다", image: sampleImage1, price: "10000원", title: "그림 그려 드립니다!", author: "닉네임", time: "5분 전", hearts: 7 },
    { id: 2, category: "해드립니다", image: sampleImage2, price: "26000원", title: "그림 잘 그리는 방법 알려드립니다", author: "스타듀밸리", time: "30분 전", hearts: 7 },
    { id: 3, category: "해주세요", image: sampleImage1, price: "15000원", title: "귀여운 캐릭커쳐 그려 드립니다!", author: "고라파덕", time: "17시간 전", hearts: 11 }
  ];

  // 검색어에 맞는 게시물 필터링
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = postList.filter(post =>
        post.title.includes(searchQuery)
      );
      setFilteredPosts(results);
    } else {
      setFilteredPosts([]);
    }
  }, [searchQuery]);

  return (
    <div>
      {/* 필터링된 게시물 리스트 */}
      <PostListBox>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostItem key={post.id}>
              <PostImage src={post.image} alt={post.title} />
              <PostContent>
                <PostInfo>
                  <PostPrice>{post.price}</PostPrice>
                  <PostTitle>{post.title}</PostTitle>
                  <PostDetails>{post.author} | {post.time}</PostDetails>
                </PostInfo>
                <HeartContainer>
                  <HeartIcon>♥</HeartIcon>
                  <HeartCount2>{post.hearts}</HeartCount2>
                </HeartContainer>
              </PostContent>
            </PostItem>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </PostListBox>
    </div>
  );
};

export default Search;
