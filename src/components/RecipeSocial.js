"use client";
import React, { useState, useEffect } from "react";

export default function RecipeSocial() {
  const [likes, setLikes] = useState(12);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(null); 
  
  
  const [comments, setComments] = useState([
    { id: 1, user: "Ayşe T.", text: "Denedim harika oldu!", userId: "static-1" },
    { id: 2, user: "Mehmet K.", text: "Biraz daha tuz eklenebilir.", userId: "static-2" },
  ]);

  const [newComment, setNewComment] = useState("");

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    
    if (!user) {
      alert("Yorum yapmak için lütfen giriş yapın!");
      return;
    }

    const commentObj = {
      id: Date.now(),
      user: user.username || user.name || "Kullanıcı", 
      userId: user.id || user._id, 
      text: newComment.trim(),
      photo: null,
    };

    setComments((prev) => [commentObj, ...prev]); 
    setNewComment("");
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Yorumunu silmek istediğine emin misin?")) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
  };

  return (
    <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Yorumlar ve Deneyimler
        </h3>

        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            isLiked
              ? "bg-red-500 text-white shadow-red-500/30 shadow-lg scale-105"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span className="font-bold">{likes} Beğeni</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none"
            rows="3"
            placeholder={user ? "Tarif hakkında ne düşünüyorsun?" : "Yorum yapmak için giriş yapmalısınız..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!user} 
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {user ? `Giriş yapıldı: ${user.username}` : "Yorum yapmak için giriş yapın"}
            </span>

            <button
              type="submit"
              disabled={!user}
              className={`px-6 py-2 rounded-lg font-medium transition-colors shadow-md ${
                user 
                ? "bg-green-600 hover:bg-green-700 text-white shadow-green-600/20" 
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Yorumu Gönder
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => {
          const displayName = comment?.user ?? "Anonymous";
          const avatarLetter = (String(displayName).charAt(0) || "V").toUpperCase();
          const isOwner = user && (comment.userId === user.id || comment.userId === user._id);

          return (
            <div key={comment.id} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 relative group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {avatarLetter}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                    {displayName}
                  </h4>
                  
                  
                  {isOwner && (
                    <button 
                      onClick={() => deleteComment(comment.id)}
                      className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Sil
                    </button>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {comment?.text ?? ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}