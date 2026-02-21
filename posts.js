// ===========================
// 포스트 데이터 파일
// 새 글을 쓰면 write.html에서
// 이 파일에 자동으로 추가됩니다.
// ===========================

const POSTS = [
    {
        id: "xgboost-vs-randomforest",
        title: "XGBoost vs Random Forest: 언제 무엇을 써야 할까?",
        category: "지도 학습",
        categoryColor: "blue",
        date: "2026-02-20",
        readTime: 7,
        excerpt: "두 앙상블 방법의 차이를 실제 데이터셋에 적용해보며 비교했습니다. 학습 속도와 성능 트레이드오프, 하이퍼파라미터 튜닝 전략까지 정리했습니다.",
        content: `## XGBoost vs Random Forest

앙상블 학습의 두 강자, XGBoost와 Random Forest를 비교해봤습니다.

### Random Forest란?

Random Forest는 **배깅(Bagging)** 방식의 앙상블입니다. 여러 결정 트리를 독립적으로 학습시키고, 결과를 투표(분류) 또는 평균(회귀)으로 합칩니다.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)
rf.fit(X_train, y_train)
\`\`\`

### XGBoost란?

XGBoost는 **부스팅(Boosting)** 방식입니다. 이전 트리의 오차를 다음 트리가 보완하는 방식으로 순차적으로 학습합니다.

\`\`\`python
import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=200,
    learning_rate=0.1,
    max_depth=6,
    subsample=0.8,
    random_state=42
)
model.fit(X_train, y_train)
\`\`\`

### 비교 결과

| 항목 | Random Forest | XGBoost |
|------|--------------|---------|
| 학습 방식 | 배깅 (병렬) | 부스팅 (순차) |
| 학습 속도 | 빠름 ⚡ | 느림 |
| 성능 | 좋음 | 더 좋음 🏆 |
| 과적합 위험 | 낮음 | 높음 (튜닝 필요) |
| 하이퍼파라미터 | 적음 | 많음 |

### 결론

- **빠른 프로토타입**: Random Forest
- **Kaggle 대회 / 최고 성능**: XGBoost (또는 LightGBM)
- **데이터가 작을 때**: Random Forest가 더 안정적
- **데이터가 많을 때**: XGBoost or LightGBM
`
    },
    {
        id: "pytorch-cnn-intro",
        title: "PyTorch로 처음 만드는 CNN 이미지 분류기",
        category: "딥러닝",
        categoryColor: "orange",
        date: "2026-02-16",
        readTime: 12,
        excerpt: "CIFAR-10 데이터셋으로 간단한 CNN을 구현해봤습니다. 레이어 쌓기부터 학습 루프, 정확도 측정까지 단계별로 정리합니다.",
        content: `## PyTorch CNN 이미지 분류기

CIFAR-10 데이터셋을 활용해 CNN을 처음부터 만들어봤습니다.

### 환경 설정

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using: {device}")
\`\`\`

### 데이터 로딩

\`\`\`python
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

trainset = torchvision.datasets.CIFAR10(
    root='./data', train=True, download=True, transform=transform
)
trainloader = torch.utils.data.DataLoader(
    trainset, batch_size=64, shuffle=True
)
\`\`\`

### CNN 모델 정의

\`\`\`python
class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 8 * 8, 512)
        self.fc2 = nn.Linear(512, 10)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.5)
    
    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)
        x = self.dropout(self.relu(self.fc1(x)))
        x = self.fc2(x)
        return x

model = SimpleCNN().to(device)
\`\`\`

### 결과

10 epoch 학습 후 **약 72% 정확도** 달성!
ResNet 등 더 깊은 모델을 쓰면 90% 이상도 가능합니다.
`
    },
    {
        id: "kmeans-elbow",
        title: "K-Means 클러스터링 최적 k값 찾기 (Elbow Method)",
        category: "비지도 학습",
        categoryColor: "purple",
        date: "2026-02-10",
        readTime: 8,
        excerpt: "Elbow Method와 Silhouette Score를 활용해 최적의 클러스터 수를 결정하는 방법을 고객 세분화 예제로 실습했습니다.",
        content: `## K-Means 최적 k값 찾기

K-Means에서 가장 중요한 것은 적절한 k(클러스터 수)를 정하는 것!

### Elbow Method

각 k에 대해 WCSS(Within-Cluster Sum of Squares)를 계산합니다.

\`\`\`python
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

wcss = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_scaled)
    wcss.append(kmeans.inertia_)

plt.figure(figsize=(8, 4))
plt.plot(range(1, 11), wcss, 'bo-')
plt.xlabel('클러스터 수 (k)')
plt.ylabel('WCSS')
plt.title('Elbow Method')
plt.axvline(x=4, color='r', linestyle='--', label='최적 k=4')
plt.legend()
plt.show()
\`\`\`

### Silhouette Score

\`\`\`python
from sklearn.metrics import silhouette_score

scores = []
for k in range(2, 11):
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = kmeans.fit_predict(X_scaled)
    score = silhouette_score(X_scaled, labels)
    scores.append(score)
    print(f"k={k}: {score:.4f}")
\`\`\`

### 결론

Elbow Method와 Silhouette Score 모두 **k=4**를 가리켜서 4개 고객 그룹으로 세분화했습니다.
`
    }
];
