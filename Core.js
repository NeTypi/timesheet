import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';

export default function TimesheetTracker() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ date: '', project: '', hours: '', notes: '' });

  useEffect(() => {
    const saved = localStorage.getItem('timesheet');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('timesheet', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!form.date || !form.project || !form.hours) return;
    setEntries([...entries, { ...form, id: Date.now() }]);
    setForm({ date: '', project: '', hours: '', notes: '' });
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🕒 Timesheet Tracker</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <Input placeholder="Project" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} />
            <Input type="number" placeholder="Hours" value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} />
            <Textarea placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>
          <Button onClick={addEntry}>Add Entry</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {entries.map(entry => (
          <Card key={entry.id}>
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold">📅 {entry.date}</p>
                <p>📁 {entry.project}</p>
                <p>⏱️ {entry.hours} hour(s)</p>
                {entry.notes && <p>📝 {entry.notes}</p>}
              </div>
              <Button variant="ghost" onClick={() => deleteEntry(entry.id)}><Trash2 className="text-red-500" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
