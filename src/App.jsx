import { useDeferredValue, useState } from "react";

const initialBooks = [
  {
    id: 1,
    title: "창의적 행동",
    author: "릭 루빈",
    category: "영감",
    borrowedBy: "민지",
    dueDate: "05.18",
  },
  {
    id: 2,
    title: "원자적 습관",
    author: "제임스 클리어",
    category: "성장",
    borrowedBy: null,
    dueDate: null,
  },
  {
    id: 3,
    title: "안드로이드는 전기양을 꿈꾸는가?",
    author: "필립 K. 딕",
    category: "공상과학",
    borrowedBy: "준",
    dueDate: "05.21",
  },
  {
    id: 4,
    title: "어린 왕자",
    author: "앙투안 드 생텍쥐페리",
    category: "고전",
    borrowedBy: null,
    dueDate: null,
  },
];

const emptyForm = {
  title: "",
  author: "",
  category: "",
};

const filters = [
  { id: "all", label: "전체" },
  { id: "available", label: "대여가능" },
  { id: "borrowed", label: "대여중" },
];

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [borrowerName, setBorrowerName] = useState("");
  const [form, setForm] = useState(emptyForm);
  const deferredQuery = useDeferredValue(query);

  const visibleBooks = books.filter((book) => {
    const matchesQuery = `${book.title} ${book.author} ${book.category}`
      .toLowerCase()
      .includes(deferredQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "available" && !book.borrowedBy) ||
      (filter === "borrowed" && book.borrowedBy);

    return matchesQuery && matchesFilter;
  });

  const borrowedCount = books.filter((book) => book.borrowedBy).length;
  const stats = [
    { label: "전체", value: books.length },
    { label: "대여가능", value: books.length - borrowedCount },
    { label: "대여중", value: borrowedCount },
  ];

  const handleBorrowToggle = (id) => {
    setBooks((currentBooks) =>
      currentBooks.map((book) => {
        if (book.id !== id) {
          return book;
        }

        if (book.borrowedBy) {
          return {
            ...book,
            borrowedBy: null,
            dueDate: null,
          };
        }

        const today = new Date();
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 7);

        return {
          ...book,
          borrowedBy: borrowerName.trim() || "Guest",
          dueDate: `${String(dueDate.getMonth() + 1).padStart(2, "0")}.${String(
            dueDate.getDate()
          ).padStart(2, "0")}`,
        };
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.author.trim() || !form.category.trim()) {
      return;
    }

    setBooks((currentBooks) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        author: form.author.trim(),
        category: form.category.trim(),
        borrowedBy: null,
        dueDate: null,
      },
      ...currentBooks,
    ]);
    setForm(emptyForm);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">도서관</p>
          <h1>반납하세요</h1>
        </div>

        <div className="stats-row">
          {stats.map((item) => (
            <article key={item.label} className="stat-chip">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </header>

      <section className="board">
        <div className="library-panel">
          <div className="toolbar">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="검색"
            />

            <input
              type="text"
              value={borrowerName}
              onChange={(event) => setBorrowerName(event.target.value)}
              placeholder="빌린사람"
            />

            <div className="filter-tabs">
              {filters.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={filter === tab.id ? "active" : ""}
                  onClick={() => setFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="book-list">
            {visibleBooks.length ? (
              visibleBooks.map((book) => (
                <article className="book-card" key={book.id}>
                  <div className="book-head">
                    <span className="category-tag">{book.category}</span>
                    <span className={book.borrowedBy ? "status busy" : "status"}>
                      {book.borrowedBy ? "대여중" : "대여가능"}
                    </span>
                  </div>

                  <div className="book-meta">
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                  </div>

                  <div className="book-foot">
                    <small>
                      {book.borrowedBy
                        ? `${book.borrowedBy} / ${book.dueDate}`
                        : "지금 사용가능"}
                    </small>

                    <button
                      type="button"
                      className={book.borrowedBy ? "ghost-button" : "mint-button"}
                      onClick={() => handleBorrowToggle(book.id)}
                    >
                      {book.borrowedBy ? "반납" : "빌리기"}
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">책이 없습니다</div>
            )}
          </div>
        </div>

        <aside className="form-panel">
          <div className="panel-title">
            <p className="eyebrow">새 책</p>
            <h2>추가</h2>
          </div>

          <form onSubmit={handleSubmit} className="book-form">
            <input
              type="text"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="제목"
            />

            <input
              type="text"
              value={form.author}
              onChange={(event) =>
                setForm((current) => ({ ...current, author: event.target.value }))
              }
              placeholder="저자"
            />

            <input
              type="text"
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({ ...current, category: event.target.value }))
              }
              placeholder="카테고리"
            />

            <button type="submit" className="mint-button submit-button">
              책 추가
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}

export default App;
