# Sample Auth Service

## Installation
- sequelize cli 6.2.0^
- jest cli 26.6.3^

## Environments
- Node: 15.11.0
- MySQL: 8.0.23
- TypeScript: 4.2.3

## DB Setup
1. 수동으로 authapp 데이터베이스 생성
2. root 경로에서 `sequelize db:migrate` 커맨드 입력하여 필요 테이블 생성

## Unit Test
- jest 커맨드를 이용하여 단위 테스트 수행 가능

## API
- `npm start` 커맨드를 실행하여 로컬 서버를 띄운 후 로컬 API 요청 가능