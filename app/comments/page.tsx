"use client"

import { useMemo, useState } from 'react'
import { Filter, Search, Sparkles } from 'lucide-react'

import { comments } from '@/lib/monitoring-data'

const sentimentOptions = ['all', 'positive', 'neutral', 'negative']
const spamOptions = ['all', 'clean', 'spam']

export default function CommentsPage() {
  const [sentiment, setSentiment] = useState('all')
  const [spam, setSpam] = useState('all')
  const [keyword, setKeyword] = useState('')

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      const keywordMatch = !keyword || comment.text.toLowerCase().includes(keyword.toLowerCase()) || comment.author.toLowerCase().includes(keyword.toLowerCase())
      const sentimentMatch = sentiment === 'all' || comment.sentiment === sentiment
      const spamMatch = spam === 'all' || (spam === 'spam' ? comment.spamScore > 0.3 : comment.spamScore <= 0.3)

      return keywordMatch && sentimentMatch && spamMatch
    })
  }, [keyword, sentiment, spam])

  return (
    <div className="space-y-6 text-slate-100">
      <section className="dashboard-panel p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <span className="section-label">Comment Intelligence</span>
          <h2 className="text-3xl font-medium text-white">Scan audience feedback, sentiment, and spam signals in one view.</h2>
          <p className="text-sm leading-7 text-slate-300">
            The filters below are wired locally so the page already behaves like the working product, even without backend auth.
          </p>
        </div>
      </section>

      <section className="dashboard-panel p-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-sm text-slate-300">
          <Filter size={16} className="text-cyan-300" />
          <span className="font-medium text-white">Filters</span>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_0.8fr_1.4fr]">
          <label className="space-y-2 text-sm text-slate-300">
            <span>Sentiment</span>
            <select value={sentiment} onChange={(event) => setSentiment(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              {sentimentOptions.map((option) => (
                <option key={option} value={option} className="bg-slate-900">
                  {option === 'all' ? 'All sentiments' : option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span>Spam status</span>
            <select value={spam} onChange={(event) => setSpam(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              {spamOptions.map((option) => (
                <option key={option} value={option} className="bg-slate-900">
                  {option === 'all' ? 'All comments' : option === 'clean' ? 'Clean only' : 'Spam only'}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span>Keyword search</span>
            <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <Search size={16} className="mr-3 text-slate-400" />
              <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Search comments or authors..." className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" />
            </div>
          </label>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="dashboard-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-label">AI summary</p>
              <h3 className="mt-2 text-xl font-medium text-white">Conversation snapshot</h3>
            </div>
            <Sparkles className="text-cyan-300" />
          </div>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Product support continues to dominate the conversation, with repeated concerns around reliability and pricing flexibility. Positive comments are clustering around the new dashboard experience.
          </p>
        </div>

        <div className="dashboard-panel p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-medium text-white">Filtered comments</h3>
            <span className="text-sm text-slate-400">{filteredComments.length} results</span>
          </div>

          <div className="mt-4 space-y-4">
            {filteredComments.map((comment) => (
              <article key={`${comment.author}-${comment.timestamp}`} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{comment.author}</p>
                      <span className="rounded-full bg-white/8 px-2 py-0.5 text-xs text-slate-300">{comment.platform}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{comment.text}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${comment.sentiment === 'positive' ? 'bg-emerald-400/10 text-emerald-200' : comment.sentiment === 'negative' ? 'bg-rose-400/10 text-rose-200' : 'bg-amber-400/10 text-amber-200'}`}>
                    {comment.sentiment}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span>Spam score: {(comment.spamScore * 100).toFixed(0)}%</span>
                  <span>•</span>
                  <span>{comment.timestamp}</span>
                  <span>•</span>
                  {comment.topics.map((topic) => (
                    <span key={topic} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-slate-300">
                      {topic}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}