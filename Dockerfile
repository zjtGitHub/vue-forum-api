# build stage
FROM node:10
LABEL maintainer=xxxxxx
# 创建一个工作目录
WORKDIR /app
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

EXPOSE port

VOLUME [ "/app/public" ]

CMD [ "node", "dist/server.bundle.js" ]