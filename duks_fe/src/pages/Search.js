import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import * as S from '../styles/SearchStyle'; // 스타일 파일

const Search = () => {
  const location = useLocation();
  const { searchQuery } = location.state; // Main에서 전달된 검색어

  const [searchResults, setSearchResults] = useState([]);

  // 검색 결과 fetch 함수
  const fetchSearchResults = async () => {
    try {
      // 서버에 검색어를 포함한 GET 요청
      const response = await axios.get(`http://localhost:5000/api/posts/search?keyword=${searchQuery}`);
      setSearchResults(response.data); // 검색 결과를 상태로 설정
    } catch (error) {
      console.error('검색 결과를 가져오는 데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <S.SearchWrapper>
      <S.SearchTitle>검색 결과: {searchQuery}</S.SearchTitle>
      <S.ResultList>
        {searchResults.length > 0 ? (
          searchResults.map((post) => (
            <S.ResultItem key={post.id}>
              <S.PostTitle>{post.title}</S.PostTitle>
              <S.PostContent>{post.content.slice(0, 100)}...</S.PostContent>
              {/* 상세 페이지로 이동하는 링크 추가 가능 */}
            </S.ResultItem>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </S.ResultList>
    </S.SearchWrapper>
  );
};

export default Search;
